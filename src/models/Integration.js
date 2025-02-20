import mongoose from "mongoose";

const integrationSchema = mongoose.Schema(
  {
    title: { type: String, required: true }, // Название интеграции
    icon: { type: String, default: "🔗" }, // Иконка
    active: { type: Boolean, default: false }, // Статус интеграции
  },
  { timestamps: true }
);

const Integration = mongoose.model("Integration", integrationSchema);
export default Integration;
