from fastapi import FastAPI
from app.api.routes import upload

app = FastAPI(title="Data Quality Platform")

app.include_router(upload.router)