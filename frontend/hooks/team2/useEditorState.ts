import { useState, useEffect } from 'react';
import { Question, QuestionType, TestCase } from '@/types/team2/question';
import { saveQuestion } from '@/lib/team2/mock/questionMock';

export function useEditorState(initialQuestion: Question | null, onSaveSuccess?: () => void) {
  const [question, setQuestion] = useState<Question | null>(initialQuestion);
  const [newTopicTag, setNewTopicTag] = useState('');
  const [newSkillTag, setNewSkillTag] = useState('');
  const [latexOn, setLatexOn] = useState(true);
  const [publishTimer, setPublishTimer] = useState(14);

  // Sync initialQuestion when it changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestion(initialQuestion);
  }, [initialQuestion]);

  // Timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPublishTimer((prev) => (prev > 1 ? prev - 1 : 15));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateField = <K extends keyof Question>(field: K, value: Question[K]) => {
    setQuestion((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleTypeChange = (type: QuestionType) => {
    setQuestion((prev) => {
      if (!prev) return null;
      let starter = prev.starterCode;
      if (type === 'MCQ') starter = '// Choose single answer';
      if (type === 'MRQ') starter = '// Select options in the UI';
      if (type === 'Programming' && prev.type !== 'Programming') {
        starter = 'def solve():\n    pass';
      }
      return { ...prev, type, starterCode: starter };
    });
  };

  const updateTestCase = <K extends keyof TestCase>(
    index: number,
    field: K,
    value: TestCase[K]
  ) => {
    if (!question) return;
    const updatedTestCases = [...question.testCases];
    updatedTestCases[index] = { ...updatedTestCases[index], [field]: value };
    updateField('testCases', updatedTestCases);
  };

  const addTestCase = () => {
    if (!question) return;
    const newTestCase: TestCase = {
      id: `tc_${Date.now()}`,
      input: '',
      expectedOutput: '',
      isPublic: true,
      timeLimit: '1.0s',
      memoryLimit: '256MB',
      matchType: 'Exact Match',
    };
    updateField('testCases', [...question.testCases, newTestCase]);
  };

  const removeTestCase = (index: number) => {
    if (!question) return;
    const updated = question.testCases.filter((_, idx) => idx !== index);
    updateField('testCases', updated);
  };

  const addTopicTag = () => {
    if (!question) return;
    const trimmed = newTopicTag.trim();
    if (trimmed && !question.tags.includes(trimmed)) {
      updateField('tags', [...question.tags, trimmed]);
      setNewTopicTag('');
    }
  };

  const removeTopicTag = (tag: string) => {
    if (!question) return;
    updateField('tags', question.tags.filter((t) => t !== tag));
  };

  const addSkillTag = () => {
    if (!question) return;
    const trimmed = newSkillTag.trim();
    if (trimmed && !question.skills.includes(trimmed)) {
      updateField('skills', [...(question.skills || []), trimmed]);
      setNewSkillTag('');
    }
  };

  const removeSkillTag = (skill: string) => {
    if (!question) return;
    updateField('skills', (question.skills || []).filter((s) => s !== skill));
  };

  const handleSave = () => {
    if (question) {
      saveQuestion(question);
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    }
  };

  return {
    question,
    setQuestion,
    newTopicTag,
    setNewTopicTag,
    newSkillTag,
    setNewSkillTag,
    latexOn,
    setLatexOn,
    publishTimer,
    updateField,
    handleTypeChange,
    updateTestCase,
    addTestCase,
    removeTestCase,
    addTopicTag,
    removeTopicTag,
    addSkillTag,
    removeSkillTag,
    handleSave,
  };
}
