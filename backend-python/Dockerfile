FROM python:3.11-slim

WORKDIR /app

# Install dependencies in a separate layer for cache efficiency
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

# Use $PORT from Render environment (falls back to 8000 locally)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
