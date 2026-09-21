from pydantic import BaseModel, HttpUrl, validator
from typing import Optional

class StudentBase(BaseModel):
    roll_number: str
    department_id: int
    cgpa: float
    skills: str
    
    # LinkedIn is mandatory for everyone
    linkedin_url: HttpUrl
    
    # GitHub is optional at the base level, but validated below for B.Tech
    github_url: Optional[HttpUrl] = None
    resume_url: Optional[str] = None

class StudentCreate(StudentBase):
    @validator("github_url", always=True)
    def validate_github(cls, v, values):
        # We assume department IDs map to streams, e.g. B.Tech departments vs Arts/Science
        # In a real system, you'd check if the department_id corresponds to a B.Tech course
        # Here we enforce it if the department_id is 1 or 2 (assuming these are CSE/IT)
        # Ideally this is validated during the service layer with DB access, but basic validation helps
        btech_department_ids = [1, 2, 3, 4] # Example: CSE, IT, ECE, EEE
        if "department_id" in values and values["department_id"] in btech_department_ids:
            if not v:
                raise ValueError("GitHub profile URL is mandatory for B.Tech students.")
        return v

class StudentUpdate(StudentBase):
    linkedin_url: HttpUrl
    github_url: Optional[HttpUrl] = None
    
    @validator("github_url", always=True)
    def validate_github(cls, v, values):
        btech_department_ids = [1, 2, 3, 4] 
        if "department_id" in values and values["department_id"] in btech_department_ids:
            if not v:
                raise ValueError("GitHub profile URL is mandatory for B.Tech students.")
        return v

class StudentResponse(StudentBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
