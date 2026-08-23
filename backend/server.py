from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="US Bakers API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    category: str
    price: int
    description: str
    image: str
    tags: List[str] = []
    featured: bool = False
    bestseller: bool = False


class CartItem(BaseModel):
    product_id: str
    name: str
    price: int
    image: str
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    email: Optional[str] = ""
    address: str
    city: str = "Pathankot"
    items: List[CartItem]
    total: int
    payment_method: str = "cod"
    notes: Optional[str] = ""


class Order(OrderCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class CustomOrderCreate(BaseModel):
    customer_name: str
    phone: str
    email: Optional[str] = ""
    occasion: str
    flavor: str
    size: str
    date_needed: Optional[str] = ""
    message_on_cake: Optional[str] = ""
    details: Optional[str] = ""
    reference_image: Optional[str] = ""  # base64 data url


class CustomOrder(CustomOrderCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Seed Data ----------------
CATEGORIES = [
    {"slug": "birthday", "name": "Birthday Cakes", "tagline": "Make a wish, we'll make the rest"},
    {"slug": "wedding", "name": "Wedding Cakes", "tagline": "Tiered masterpieces for forever"},
    {"slug": "anniversary", "name": "Anniversary Cakes", "tagline": "Celebrate every year of love"},
    {"slug": "hampers", "name": "Gift Hampers", "tagline": "Curated indulgence, beautifully boxed"},
]

SEED_PRODUCTS = [
    # Birthday
    {"name": "Rose Pearl Two-Tier", "category": "birthday", "price": 2499, "bestseller": True, "featured": True,
     "image": "https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "A blush two-tier celebration cake adorned with hand-piped roses and delicate sugar pearls.", "tags": ["pink", "floral"]},
    {"name": "Blush Buttercream Bloom", "category": "birthday", "price": 1699, "bestseller": True,
     "image": "https://images.pexels.com/photos/29192489/pexels-photo-29192489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Soft pink buttercream with intricate piping detail — a timeless birthday favourite.", "tags": ["pink", "classic"]},
    {"name": "Fondant Elegance", "category": "birthday", "price": 2199,
     "image": "https://images.unsplash.com/photo-1557308536-ee471ef2c390?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Smooth fondant finish with refined detailing for a sculpted, modern celebration.", "tags": ["fondant"]},
    {"name": "Petal Pink Party", "category": "birthday", "price": 1499,
     "image": "https://images.unsplash.com/photo-1624240383807-464f369e4b1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Playful sprinkles meet soft pink frosting — pure birthday joy in every slice.", "tags": ["pink", "fun"]},
    # Wedding
    {"name": "Grand Rose Cascade", "category": "wedding", "price": 8999, "featured": True, "bestseller": True,
     "image": "https://images.unsplash.com/photo-1565987164841-7132b384293b?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A four-tier statement cake wrapped in cascading blush florals for the grandest of days.", "tags": ["tiered", "floral"]},
    {"name": "Ivory Fondant Majesty", "category": "wedding", "price": 10499,
     "image": "https://images.unsplash.com/photo-1535254973040-607b474cb50d?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Four tiers of flawless ivory fondant — architectural, elegant, unforgettable.", "tags": ["fondant", "tiered"]},
    {"name": "Garden Peony Tier", "category": "wedding", "price": 7499,
     "image": "https://images.unsplash.com/photo-1629576690723-bb3a22ae7126?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Fresh peony accents on soft cream tiers, styled for romantic garden ceremonies.", "tags": ["floral"]},
    {"name": "Chandelier Classic", "category": "wedding", "price": 6999, "featured": True,
     "image": "https://images.pexels.com/photos/38542616/pexels-photo-38542616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "A luminous centrepiece cake designed to shine beneath the chandeliers.", "tags": ["luxury"]},
    # Anniversary
    {"name": "Rose & Sage Devotion", "category": "anniversary", "price": 3299, "bestseller": True, "featured": True,
     "image": "https://images.unsplash.com/photo-1761671613315-53157f91d0f8?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Soft pink roses and fresh greenery on ivory — a toast to years of togetherness.", "tags": ["floral", "romantic"]},
    {"name": "Crimson Rose Royale", "category": "anniversary", "price": 4599,
     "image": "https://images.unsplash.com/photo-1786125493201-73e548df22fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Bold crimson roses and gilded trim across dramatic tiers for milestone anniversaries.", "tags": ["luxury", "gold"]},
    {"name": "Marble Blush Romance", "category": "anniversary", "price": 2899,
     "image": "https://images.pexels.com/photos/36497518/pexels-photo-36497518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Delicate pink roses on a smooth marble-white finish — understated and elegant.", "tags": ["pink", "minimal"]},
    {"name": "Candlelit Rosette", "category": "anniversary", "price": 2299,
     "image": "https://images.pexels.com/photos/433527/pexels-photo-433527.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Piped rosettes and a floral bouquet for an intimate, candlelit celebration.", "tags": ["pink", "romantic"]},
    # Hampers
    {"name": "Gourmet Indulgence Box", "category": "hampers", "price": 1899, "bestseller": True, "featured": True,
     "image": "https://images.unsplash.com/photo-1773450970981-793e2d72d820?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "An artisan spread of treats and fresh fruit, boxed with a signature US Bakers ribbon.", "tags": ["gourmet"]},
    {"name": "Classic Celebration Basket", "category": "hampers", "price": 1499,
     "image": "https://images.unsplash.com/photo-1508899203029-1c9eb493c9bd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A generous woven basket brimming with sweet and savoury delights.", "tags": ["classic"]},
    {"name": "Chocolate Lover's Hamper", "category": "hampers", "price": 2299, "featured": True,
     "image": "https://images.unsplash.com/photo-1781263538938-561a5e1acc51?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A decadent chocolate collection paired with a candle and handwritten card.", "tags": ["chocolate"]},
    {"name": "Artisan Snack Crate", "category": "hampers", "price": 1699,
     "image": "https://images.pexels.com/photos/17878238/pexels-photo-17878238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "A curated crate of gourmet snacks and treats — the perfect thoughtful gift.", "tags": ["gourmet"]},
]


async def seed_products():
    count = await db.products.count_documents({})
    if count == 0:
        docs = []
        for p in SEED_PRODUCTS:
            slug = p["name"].lower().replace("&", "and").replace("'", "").replace(" ", "-")
            prod = Product(slug=slug, **p)
            docs.append(prod.model_dump())
        await db.products.insert_many(docs)
        logger.info(f"Seeded {len(docs)} products")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "US Bakers API"}


@api_router.get("/categories")
async def get_categories():
    return CATEGORIES


@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, bestseller: Optional[bool] = None,
                       featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if bestseller is not None:
        query["bestseller"] = bestseller
    if featured is not None:
        query["featured"] = featured
    docs = await db.products.find(query, {"_id": 0}).to_list(200)
    return docs


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return doc


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    order = Order(**payload.model_dump())
    await db.orders.insert_one(order.model_dump())
    return order


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    doc = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    return doc


@api_router.post("/custom-orders", response_model=CustomOrder)
async def create_custom_order(payload: CustomOrderCreate):
    order = CustomOrder(**payload.model_dump())
    await db.custom_orders.insert_one(order.model_dump())
    return order


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await seed_products()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
