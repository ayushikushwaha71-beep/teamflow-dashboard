import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageCircle, Paperclip, User } from "lucide-react";

function TaskCard({ task }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: task.id });

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
      <p>{task.desc}</p>

      <div className="task-bottom">
        <div className="icons">
          <Calendar size={16} />
          <MessageCircle size={16} />
          <span>{task.comments}</span>
          <Paperclip size={16} />
        </div>

        <div className="avatar">
          <User size={16} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;