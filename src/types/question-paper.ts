export interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  course: string;
  faculty: string;
  coordinator: string;
  createdAt: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  totalMarks: number;
  duration: string;
  instructions: string[];
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  instructions: string;
  questions: Question[];
  totalMarks: number;
}

export interface Question {
  id: string;
  text: string;
  marks: number;
  bloomLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  difficulty: 'easy' | 'medium' | 'hard';
  unit: string;
  topic: string;
  keywords: string[];
}

export interface Rubric {
  id: string;
  subject: string;
  totalMarks: number;
  duration: string;
  bloomDistribution: {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
  };
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  unitDistribution: { [unit: string]: number };
  sectionFormat: {
    name: string;
    marks: number;
    questionCount: number;
    instructions: string;
  }[];
}