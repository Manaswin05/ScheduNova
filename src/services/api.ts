import axios from 'axios';
import { StudyTask, AiRecommendation } from '../types/schedunova';

// Use environment variables for production, fallback to localhost for dev
const NODE_API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:5000/api';
const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL || 'http://localhost:8000/api';

// Shared axios instance with timeout to prevent hanging requests
const nodeClient = axios.create({
  baseURL: NODE_API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

const pythonClient = axios.create({
  baseURL: PYTHON_API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Study Tasks (Node.js backend) ───────────────────────────────────────────

export const getTasks = async (): Promise<StudyTask[]> => {
  try {
    const response = await nodeClient.get('/tasks');
    return response.data;
  } catch (error) {
    console.warn('[API] Node backend unavailable — using mock data.');
    return [];
  }
};

export const createTask = async (task: Partial<StudyTask>): Promise<StudyTask> => {
  const response = await nodeClient.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<StudyTask>): Promise<StudyTask> => {
  const response = await nodeClient.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await nodeClient.delete(`/tasks/${id}`);
};

// ─── AI Recommendations (Python/FastAPI backend) ──────────────────────────────

export const getAiRecommendations = async (metrics: {
  sleepHoursLastNight: number;
  averageStressThisWeek: number;
  burnoutRisk: string;
}): Promise<AiRecommendation[]> => {
  try {
    const response = await pythonClient.post('/ai/recommendations', metrics);
    return response.data.recommendations;
  } catch (error) {
    console.warn('[API] Python backend unavailable — returning empty recommendations.');
    return [];
  }
};

// ─── Health Checks ───────────────────────────────────────────────────────────

export const checkNodeHealth = async (): Promise<boolean> => {
  try {
    await nodeClient.get('/health', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};

export const checkPythonHealth = async (): Promise<boolean> => {
  try {
    await pythonClient.get('/', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};
