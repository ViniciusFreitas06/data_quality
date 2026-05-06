from fastapi import APIRouter, UploadFile, File
from app.services.data_analysis_service import analyze_dataset
from app.schemas.analysis_schema import AnalysisResponse

router = APIRouter()

@router.post("/upload", response_model=AnalysisResponse)
async def upload_file(file: UploadFile = File(...)):
    result = analyze_dataset(file.file)
    return result