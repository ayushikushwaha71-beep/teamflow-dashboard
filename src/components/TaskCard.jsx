import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageCircle } from "lucide-react";

function TaskCard({ task }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task"
      {...attributes}
      {...listeners}
    >
      <h4>{task.title}</h4>

      <div className="task-icons">
        <Calendar size={14} />
        <MessageCircle size={14} />
      </div>
    </div>
  );
}

export default TaskCard;