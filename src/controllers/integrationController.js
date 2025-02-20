import Integration from "../models/Integration.js";

// 🔹 Получение всех интеграций
export const getIntegrations = async (req, res) => {
  try {
    const integrations = await Integration.find();
    res.json(integrations);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// 🔹 Обновление статуса интеграции
export const updateIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findById(id);

    if (!integration) {
      return res.status(404).json({ message: "Интеграция не найдена" });
    }

    integration.active = !integration.active;
    await integration.save();

    res.json({ message: "Статус обновлён", integration });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
