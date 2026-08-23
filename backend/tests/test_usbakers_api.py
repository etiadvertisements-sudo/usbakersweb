"""US Bakers backend API tests"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://custom-cake-studio-65.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---- categories ----
def test_categories(s):
    r = s.get(f"{API}/categories", timeout=30)
    assert r.status_code == 200
    data = r.json()
    slugs = {c["slug"] for c in data}
    assert slugs == {"birthday", "wedding", "anniversary", "hampers"}


# ---- products list ----
def test_products_all(s):
    r = s.get(f"{API}/products", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 16
    for p in data:
        assert "slug" in p and "name" in p and "price" in p
        assert "_id" not in p


def test_products_by_category(s):
    r = s.get(f"{API}/products?category=birthday", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 4
    assert all(p["category"] == "birthday" for p in data)


def test_products_bestseller_filter(s):
    r = s.get(f"{API}/products?bestseller=true", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 1
    assert all(p["bestseller"] is True for p in data)


def test_products_featured_filter(s):
    r = s.get(f"{API}/products?featured=true", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 1
    assert all(p["featured"] is True for p in data)


# ---- product detail ----
def test_product_by_slug(s):
    r = s.get(f"{API}/products/rose-pearl-two-tier", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert data["slug"] == "rose-pearl-two-tier"
    assert data["category"] == "birthday"


def test_product_invalid_slug(s):
    r = s.get(f"{API}/products/does-not-exist", timeout=30)
    assert r.status_code == 404


# ---- orders ----
@pytest.fixture(scope="module")
def created_order(s):
    payload = {
        "customer_name": "TEST_Alice",
        "phone": "9999999999",
        "email": "test@usbakers.test",
        "address": "12 Test Lane",
        "city": "Pathankot",
        "items": [{"product_id": "p1", "name": "Rose Pearl Two-Tier", "price": 2499, "image": "x", "quantity": 2}],
        "total": 4998,
        "payment_method": "cod",
        "notes": "test"
    }
    r = s.post(f"{API}/orders", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    return r.json()


def test_create_order(created_order):
    assert created_order["id"]
    assert created_order["status"] == "pending"
    assert created_order["payment_method"] == "cod"
    assert created_order["total"] == 4998


def test_get_order(s, created_order):
    r = s.get(f"{API}/orders/{created_order['id']}", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert data["id"] == created_order["id"]
    assert data["customer_name"] == "TEST_Alice"


def test_get_order_404(s):
    r = s.get(f"{API}/orders/not-a-real-id", timeout=30)
    assert r.status_code == 404


# ---- custom orders ----
def test_create_custom_order(s):
    payload = {
        "customer_name": "TEST_Bob",
        "phone": "9888888888",
        "occasion": "birthday",
        "flavor": "Chocolate",
        "size": "1kg",
        "message_on_cake": "Happy Bday",
        "details": "photo cake please",
        "reference_image": "data:image/png;base64,iVBORw0KGgo="
    }
    r = s.post(f"{API}/custom-orders", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["id"]
    assert data["status"] == "new"
    assert data["flavor"] == "Chocolate"
