# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
#WORKDIR /app

# Copy the requirements file into the container and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI application source code into the container
#COPY . .

# Expose the port that the FastAPI app will run on
#EXPOSE 8000

# Command to run the FastAPI app when the container starts
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
