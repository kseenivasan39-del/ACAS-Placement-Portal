from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

from app.db.base_class import Base

class RoleEnum(str, enum.Enum):
    STUDENT = "student"
    PLACEMENT_OFFICER = "placement_officer"
    RECRUITER = "recruiter"
    HOD = "hod"
    ADMIN = "admin"
    ALUMNI = "alumni"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    role = Column(Enum(RoleEnum), default=RoleEnum.STUDENT, nullable=False)
    is_active = Column(Boolean(), default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
