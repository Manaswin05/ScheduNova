import mongoose, { Schema, Document } from 'mongoose';

export interface IStudyTask extends Document {
  title: string;
  subject: string;
  durationMinutes: number;
  estimatedDurationMinutes?: number;
  actualDurationMinutes?: number;
  difficulty: 'low' | 'medium' | 'high' | 'intense';
  status: 'todo' | 'in_progress' | 'completed' | 'skipped';
  startTime?: string;
  endTime?: string;
  notes?: string;
}

const StudyTaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  estimatedDurationMinutes: { type: Number },
  actualDurationMinutes: { type: Number },
  difficulty: { type: String, enum: ['low', 'medium', 'high', 'intense'], required: true },
  status: { type: String, enum: ['todo', 'in_progress', 'completed', 'skipped'], default: 'todo' },
  startTime: { type: String },
  endTime: { type: String },
  notes: { type: String }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Transform output to change _id to id to match frontend interface
StudyTaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

export default mongoose.model<IStudyTask>('StudyTask', StudyTaskSchema);
