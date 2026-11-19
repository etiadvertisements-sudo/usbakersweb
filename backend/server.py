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
    weight: str = "500 g"
    eggless: bool = True
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
    coupon_code: Optional[str] = ""
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


class CouponCheck(BaseModel):
    code: str
    subtotal: int


class ContactMessageCreate(BaseModel):
    name: str
    email: Optional[str] = ""
    phone: str
    subject: Optional[str] = "General enquiry"
    message: str


class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Seed Data ----------------
CATEGORIES = [
    {"slug": "cakes", "name": "Cakes", "tagline": "Celebration cakes for every occasion",
     "image": "https://images.pexels.com/photos/29192489/pexels-photo-29192489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"},
    {"slug": "pastries", "name": "Pastries", "tagline": "Little slices of happiness",
     "image": "https://images.unsplash.com/photo-1610611424854-5e07032143d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
    {"slug": "brownies", "name": "Brownies", "tagline": "Fudgy, dense, irresistible",
     "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
    {"slug": "cupcakes", "name": "Cupcakes & Desserts", "tagline": "Bite-sized joy, frosted to perfection",
     "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
    {"slug": "cookies", "name": "Cookies & Biscuits", "tagline": "Crunchy, buttery, fresh from the oven",
     "image": "https://images.unsplash.com/photo-1782227149180-2d321c5042ed?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
    {"slug": "savouries", "name": "Savouries", "tagline": "Baked bites for every craving",
     "image": "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
    {"slug": "gifting", "name": "Gifting & Hampers", "tagline": "Curated indulgence, beautifully boxed",
     "image": "https://images.pexels.com/photos/28769885/pexels-photo-28769885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"},
    {"slug": "wedding", "name": "Wedding Cakes", "tagline": "Tiered masterpieces for forever",
     "image": "https://images.unsplash.com/photo-1565987164841-7132b384293b?crop=entropy&cs=srgb&fm=jpg&q=85&w=400"},
]

COUPONS = {
    "USB500": {"type": "flat", "amount": 50, "min_order": 500, "label": "₹50 off on orders above ₹500"},
    "USB800": {"type": "flat", "amount": 75, "min_order": 800, "label": "₹75 off on orders above ₹800"},
    "USB1000": {"type": "flat", "amount": 100, "min_order": 1000, "label": "₹100 off on orders above ₹1000"},
    "USB1500": {"type": "flat", "amount": 200, "min_order": 1500, "label": "₹200 off on orders above ₹1500"},
    "COMBO15": {"type": "percent", "amount": 15, "min_order": 0, "label": "15% off on all orders"},
}

SEED_PRODUCTS = [
    # Cakes
    {"name": "Rose Pearl Two-Tier", "category": "cakes", "price": 2499, "bestseller": True, "featured": True, "weight": "1.5 kg",
     "image": "https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "A blush two-tier celebration cake adorned with hand-piped roses and delicate sugar pearls.", "tags": ["birthday", "pink", "floral"]},
    {"name": "Blush Buttercream Bloom", "category": "cakes", "price": 1699, "bestseller": True, "weight": "1 kg",
     "image": "https://images.pexels.com/photos/29192489/pexels-photo-29192489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Soft pink buttercream with intricate piping detail — a timeless birthday favourite.", "tags": ["birthday", "pink", "classic"]},
    {"name": "Dutch Truffle Cake", "category": "cakes", "price": 850, "bestseller": True, "featured": True, "weight": "500 g",
     "image": "https://images.unsplash.com/photo-1615796701805-2094ac54bbf9?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Rich, dense chocolate truffle layered with silky ganache. Our most-loved cake.", "tags": ["chocolate"]},
    {"name": "Fondant Elegance", "category": "cakes", "price": 2199, "weight": "1 kg",
     "image": "https://images.unsplash.com/photo-1557308536-ee471ef2c390?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Smooth fondant finish with refined detailing for a sculpted, modern celebration.", "tags": ["birthday", "fondant"]},
    {"name": "Petal Pink Party", "category": "cakes", "price": 1499, "weight": "1 kg",
     "image": "https://images.unsplash.com/photo-1624240383807-464f369e4b1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Playful sprinkles meet soft pink frosting — pure birthday joy in every slice.", "tags": ["birthday", "pink", "fun"]},
    {"name": "Signature Fudge Cake", "category": "cakes", "price": 950, "weight": "500 g",
     "image": "https://images.unsplash.com/photo-1606313564573-104197cf8f91?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Deep fudge layers with a glossy chocolate crown. Decadence defined.", "tags": ["chocolate"]},
    {"name": "Rose & Sage Devotion", "category": "cakes", "price": 3299, "bestseller": True, "weight": "1.5 kg",
     "image": "https://images.unsplash.com/photo-1761671613315-53157f91d0f8?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Soft pink roses and fresh greenery on ivory — a toast to years of togetherness.", "tags": ["anniversary", "floral", "romantic"]},
    {"name": "Marble Blush Romance", "category": "cakes", "price": 2899, "weight": "1.5 kg",
     "image": "https://images.pexels.com/photos/36497518/pexels-photo-36497518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Delicate pink roses on a smooth marble-white finish — understated and elegant.", "tags": ["anniversary", "pink", "minimal"]},
    {"name": "Crimson Rose Royale", "category": "cakes", "price": 4599, "weight": "2 kg",
     "image": "https://images.unsplash.com/photo-1786125493201-73e548df22fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Bold crimson roses and gilded trim across dramatic tiers for milestone anniversaries.", "tags": ["anniversary", "luxury", "gold"]},
    {"name": "Candlelit Rosette", "category": "cakes", "price": 2299, "weight": "1 kg",
     "image": "https://images.pexels.com/photos/433527/pexels-photo-433527.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Piped rosettes and a floral bouquet for an intimate, candlelit celebration.", "tags": ["anniversary", "pink", "romantic"]},
    # Pastries
    {"name": "Fresh Cream Pineapple Pastry", "category": "pastries", "price": 95, "bestseller": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1610611424854-5e07032143d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Light sponge layered with fresh cream and juicy pineapple. A classic done right.", "tags": ["classic"]},
    {"name": "Chocoholic Pastry", "category": "pastries", "price": 110, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1708175313814-679cb8e90d2e?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "For true chocolate lovers — moist chocolate sponge, dark ganache, cocoa dust.", "tags": ["chocolate"]},
    {"name": "Butterscotch Crunch Pastry", "category": "pastries", "price": 95, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1667298216085-b0bf5a2e1944?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Caramel-kissed cream with a golden praline crunch in every bite.", "tags": ["classic"]},
    {"name": "Red Velvet Pastry", "category": "pastries", "price": 120, "featured": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1702742322469-36315505728f?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Velvety crimson crumb with tangy cream cheese frosting. Simply iconic.", "tags": ["premium"]},
    # Brownies
    {"name": "Walnut Brownie", "category": "brownies", "price": 130, "bestseller": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Fudgy, dense and loaded with toasted walnuts. The original US Bakers signature.", "tags": ["classic"]},
    {"name": "Choco Chip Brownie", "category": "brownies", "price": 120, "bestseller": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1636743715220-d8f8dd900b87?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Double chocolate with molten chips baked right through.", "tags": ["chocolate"]},
    {"name": "Nutella Swirl Brownie", "category": "brownies", "price": 160, "featured": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1515037893149-de7f840978e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A hazelnut-chocolate swirl through our richest fudge brownie.", "tags": ["premium"]},
    {"name": "Millionaire Brownie", "category": "brownies", "price": 180, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1588539543889-20cc7ce4df55?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Caramel centre, chocolate top, pure indulgence. Worth every rupee.", "tags": ["premium"]},
    # Cupcakes & Desserts
    {"name": "Strawberry Cloud Cupcake", "category": "cupcakes", "price": 90, "bestseller": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Fluffy vanilla base crowned with strawberry cream frosting.", "tags": ["pink"]},
    {"name": "Classic Chocolate Cupcake", "category": "cupcakes", "price": 85, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Moist chocolate sponge with a generous swirl of chocolate buttercream.", "tags": ["chocolate"]},
    {"name": "Blueberry Bliss Cupcake", "category": "cupcakes", "price": 95, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1603532648955-039310d9ed75?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Bursting blueberries folded into a light sponge with cream cheese icing.", "tags": ["fruit"]},
    {"name": "Tiramisu Dessert Cup", "category": "cupcakes", "price": 160, "featured": True, "weight": "1 cup",
     "image": "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Espresso-soaked layers and mascarpone clouds in an individual cup.", "tags": ["premium", "coffee"]},
    # Cookies
    {"name": "Choco Chip Cookies (Box of 6)", "category": "cookies", "price": 220, "bestseller": True, "weight": "6 pc",
     "image": "https://images.unsplash.com/photo-1782227149180-2d321c5042ed?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Crisp edges, chewy centres, molten chips. Baked fresh every morning.", "tags": ["chocolate", "box"]},
    {"name": "Double Chocolate Cookies (Box of 6)", "category": "cookies", "price": 250, "weight": "6 pc",
     "image": "https://images.unsplash.com/photo-1782852230919-3471990d385d?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Cocoa-rich dough loaded with dark chocolate chunks.", "tags": ["chocolate", "box"]},
    {"name": "Butter Palmiers", "category": "cookies", "price": 180, "weight": "150 g",
     "image": "https://images.unsplash.com/photo-1767339300211-00be83435c63?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Caramelised, flaky, buttery little hearts — perfect with chai.", "tags": ["classic"]},
    {"name": "Almond Biscotti", "category": "cookies", "price": 210, "featured": True, "weight": "150 g",
     "image": "https://images.unsplash.com/photo-1782852232674-64bc7f102866?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Twice-baked Italian style with toasted almonds. Dunk-worthy.", "tags": ["premium"]},
    # Savouries
    {"name": "Butter Croissant", "category": "savouries", "price": 75, "bestseller": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "48-hour laminated dough, golden and shatter-crisp outside, airy inside.", "tags": ["classic"]},
    {"name": "Paneer Tikka Croissant", "category": "savouries", "price": 120, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Our flaky croissant stuffed with spiced paneer tikka. Desi meets Paris.", "tags": ["spicy"]},
    {"name": "Cheese & Corn Danish", "category": "savouries", "price": 110, "featured": True, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1763207291761-e27bb059d851?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Buttery danish with creamy cheese and sweet corn filling.", "tags": ["cheesy"]},
    {"name": "Veg Puff", "category": "savouries", "price": 45, "weight": "1 pc",
     "image": "https://images.unsplash.com/photo-1691480162735-9b91238080f6?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Flaky puff pastry with a spiced vegetable filling. A bakery classic.", "tags": ["classic", "spicy"]},
    # Gifting
    {"name": "Luxury Celebration Hamper", "category": "gifting", "price": 1899, "bestseller": True, "featured": True, "weight": "1 box",
     "image": "https://images.pexels.com/photos/28769885/pexels-photo-28769885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "Brownies, cookies, chocolates and treats in a keepsake box with our signature ribbon.", "tags": ["hamper"]},
    {"name": "Classic Celebration Basket", "category": "gifting", "price": 1499, "weight": "1 basket",
     "image": "https://images.unsplash.com/photo-1508899203029-1c9eb493c9bd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A generous woven basket brimming with sweet and savoury delights.", "tags": ["classic"]},
    {"name": "Chocolate Lover's Hamper", "category": "gifting", "price": 2299, "featured": True, "weight": "1 box",
     "image": "https://images.unsplash.com/photo-1781263538938-561a5e1acc51?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A decadent chocolate collection paired with a candle and handwritten card.", "tags": ["chocolate"]},
    {"name": "Assorted Brownie Box (6 pc)", "category": "gifting", "price": 699, "weight": "6 pc",
     "image": "https://images.unsplash.com/photo-1773450970981-793e2d72d820?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Six of our best brownies — walnut, choco chip, Nutella and millionaire.", "tags": ["brownie", "box"]},
    # Wedding
    {"name": "Grand Rose Cascade", "category": "wedding", "price": 8999, "featured": True, "bestseller": True, "weight": "4 tiers",
     "image": "https://images.unsplash.com/photo-1565987164841-7132b384293b?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "A four-tier statement cake wrapped in cascading blush florals for the grandest of days.", "tags": ["tiered", "floral"]},
    {"name": "Ivory Fondant Majesty", "category": "wedding", "price": 10499, "weight": "4 tiers",
     "image": "https://images.unsplash.com/photo-1535254973040-607b474cb50d?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Four tiers of flawless ivory fondant — architectural, elegant, unforgettable.", "tags": ["fondant", "tiered"]},
    {"name": "Garden Peony Tier", "category": "wedding", "price": 7499, "weight": "3 tiers",
     "image": "https://images.unsplash.com/photo-1629576690723-bb3a22ae7126?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
     "description": "Fresh peony accents on soft cream tiers, styled for romantic garden ceremonies.", "tags": ["floral"]},
    {"name": "Chandelier Classic", "category": "wedding", "price": 6999, "featured": True, "weight": "3 tiers",
     "image": "https://images.pexels.com/photos/38542616/pexels-photo-38542616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "description": "A luminous centrepiece cake designed to shine beneath the chandeliers.", "tags": ["luxury"]},
]


async def seed_products():
    docs = []
    for p in SEED_PRODUCTS:
        slug = p["name"].lower().replace("&", "and").replace("'", "").replace("(", "").replace(")", "").replace(",", "").replace(" ", "-")
        prod = Product(slug=slug, **p).model_dump()
        docs.append(prod)
    for doc in docs:
        await db.products.update_one({"slug": doc["slug"]}, {"$set": doc}, upsert=True)
    # remove stale products not in current catalog
    await db.products.delete_many({"slug": {"$nin": [d["slug"] for d in docs]}})
    logger.info(f"Seeded/updated {len(docs)} products")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "US Bakers API"}


@api_router.get("/categories")
async def get_categories():
    return CATEGORIES


@api_router.get("/offers")
async def get_offers():
    return [{"code": code, **c} for code, c in COUPONS.items()]


@api_router.post("/coupons/validate")
async def validate_coupon(payload: CouponCheck):
    code = payload.code.strip().upper()
    coupon = COUPONS.get(code)
    if not coupon:
        raise HTTPException(status_code=404, detail="Invalid coupon code")
    if payload.subtotal < coupon["min_order"]:
        raise HTTPException(status_code=400, detail=f"Minimum order of ₹{coupon['min_order']} required")
    if coupon["type"] == "flat":
        discount = coupon["amount"]
    else:
        discount = int(payload.subtotal * coupon["amount"] / 100)
    return {"code": code, "discount": discount, "label": coupon["label"]}


@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, bestseller: Optional[bool] = None,
                       featured: Optional[bool] = None, tag: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if bestseller is not None:
        query["bestseller"] = bestseller
    if featured is not None:
        query["featured"] = featured
    if tag:
        query["tags"] = tag
    docs = await db.products.find(query, {"_id": 0}).to_list(300)
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


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


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
