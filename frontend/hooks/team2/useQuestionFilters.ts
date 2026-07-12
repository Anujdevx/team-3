import { useState, useMemo } from 'react';
import { Question } from '@/types/team2/question';

export function useQuestionFilters(questions: Question[], itemsPerPage: number = 5) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedDifficulty, setSelectedDifficulty] = useState(''); // Empty string means "All"
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedCreator, setSelectedCreator] = useState('All Creators');

  // UI Interactive States
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Clear filters helper
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedDifficulty('');
    setSelectedTopic('All Topics');
    setSelectedStatus('All Status');
    setSelectedCreator('All Creators');
    setCurrentPage(1);
  };

  // Derive unique topics and creators
  const allTopics = useMemo(() => {
    return Array.from(new Set(questions.flatMap((q) => q.tags)));
  }, [questions]);

  const allCreators = useMemo(() => {
    return Array.from(new Set(questions.map((q) => q.creator)));
  }, [questions]);

  // Derived filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.creator.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All Types' || q.type === selectedType;

      let targetDiff = selectedDifficulty;
      if (selectedDifficulty === 'Med') targetDiff = 'Medium';
      if (selectedDifficulty === 'Exp') targetDiff = 'Expert';
      const matchesDifficulty = !selectedDifficulty || q.difficulty === targetDiff;

      const matchesTopic = selectedTopic === 'All Topics' || q.tags.includes(selectedTopic);
      const matchesStatus = selectedStatus === 'All Status' || q.status === selectedStatus;
      const matchesCreator = selectedCreator === 'All Creators' || q.creator === selectedCreator;

      return (
        matchesSearch &&
        matchesType &&
        matchesDifficulty &&
        matchesTopic &&
        matchesStatus &&
        matchesCreator
      );
    });
  }, [
    questions,
    searchQuery,
    selectedType,
    selectedDifficulty,
    selectedTopic,
    selectedStatus,
    selectedCreator,
  ]);

  // Derived paginated questions
  const totalPages = useMemo(() => {
    return Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  }, [filteredQuestions, itemsPerPage]);

  const paginatedQuestions = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredQuestions, currentPage, itemsPerPage]);

  // Selection handlers
  const handleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRowIds.length === paginatedQuestions.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(paginatedQuestions.map((q) => q.id));
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTopic,
    setSelectedTopic,
    selectedStatus,
    setSelectedStatus,
    selectedCreator,
    setSelectedCreator,
    selectedRowIds,
    setSelectedRowIds,
    currentPage,
    setCurrentPage,
    allTopics,
    allCreators,
    filteredQuestions,
    paginatedQuestions,
    totalPages,
    handleClearFilters,
    handleSelectRow,
    handleSelectAll,
  };
}
