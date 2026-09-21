from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base_class import Base

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    roll_number = Column(String, unique=True, index=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    cgpa = Column(Float)
    resume_url = Column(String)
    github_url = Column(String)
    linkedin_url = Column(String)
    skills = Column(Text)
    
    # Relationships
    user = relationship("User", backref="student_profile")
    department = relationship("Department")

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)
    website = Column(String)
    industry = Column(String)
    logo_url = Column(String)

class PlacementDrive(Base):
    __tablename__ = "placement_drives"
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    title = Column(String, nullable=False)
    description = Column(Text)
    eligible_departments = Column(Text) # Comma separated or JSON
    min_cgpa = Column(Float)
    salary_package = Column(String)
    date_of_drive = Column(DateTime)
    
    company = relationship("Company", backref="drives")

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    drive_id = Column(Integer, ForeignKey("placement_drives.id"))
    status = Column(String, default="applied") # applied, shortlisted, interviewed, placed, rejected
    applied_at = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", backref="applications")
    drive = relationship("PlacementDrive", backref="applications")
