from enum import StrEnum


class ExamSessionStatus(StrEnum):
    INVITED = "invited"
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    TERMINATED = "terminated"
    EXPIRED = "expired"

class QuestionSelectionMode(StrEnum):
    MANUAL = "manual"
    RANDOM_POOL = "random_pool"
