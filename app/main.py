from fastapi import FastAPI
from app.api.routes import upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Data Quality Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "Data Quality"}