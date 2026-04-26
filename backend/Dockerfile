# Use Python 3.12 as base image
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# Copy the entire project (including core/, ai/, docs/, backend/)
COPY . .

# Install Python dependencies from backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Set Python path so imports work
ENV PYTHONPATH=/app

# Note: API keys are NOT hardcoded here
# They will be passed from your .env file at runtime

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the backend
# Keys will come from --env-file when you run docker run
# Command to run the backend
CMD ["python", "-m", "uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]