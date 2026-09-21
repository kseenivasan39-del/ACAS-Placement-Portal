from pydantic import BaseModel, EmailStr, validator, Field
from typing import Optional
from app.models.user import RoleEnum

# Common public email providers to block for recruiters
PUBLIC_DOMAINS = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"}
INSTITUTE_DOMAIN = "aei.edu.in"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: RoleEnum = RoleEnum.STUDENT

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

    @validator("email")
    def validate_email_domain(cls, v, values):
        if "role" not in values:
            return v
            
        role = values["role"]
        domain = v.split("@")[-1].lower()

        if role in [RoleEnum.STUDENT, RoleEnum.PLACEMENT_OFFICER, RoleEnum.HOD, RoleEnum.ADMIN]:
            if domain != INSTITUTE_DOMAIN:
                raise ValueError(f"Registration for {role.value} is restricted to @{INSTITUTE_DOMAIN} emails.")
                
        elif role == RoleEnum.RECRUITER:
            if domain in PUBLIC_DOMAINS:
                raise ValueError("Recruiters must register using a corporate email address, not public domains like gmail.com.")
                
        return v

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
