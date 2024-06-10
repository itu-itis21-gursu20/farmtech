class EngineerController {

    constructor({ createEngineer, getEngineer, updateEngineer, deleteEngineer }) {
      this.createEngineer = createEngineer;
      this.getEngineer = getEngineer;
      this.updateEngineer = updateEngineer;
      this.deleteEngineer = deleteEngineer;
    }
  
    async createEngineerHandler(req, res) {
      try {
        const engineer = await this.createEngineer.execute(req.body);
        res.status(201).json(engineer);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getEngineerHandler(req, res) {
      try {
        const engineer = await this.getEngineer.execute(req.params.phoneNumber);
        if (engineer) {
          res.status(200).json(engineer);
        } else {
          res.status(404).json({ message: 'Engineer not found.' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async updateEngineerHandler(req, res) {
      try {
        const engineer = await this.updateEngineer.execute(req.params.phoneNumber, req.body);
        if (engineer) {
          res.status(200).json(engineer);
        } else {
          res.status(404).json({ message: 'Engineer not found.' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async deleteEngineerHandler(req, res) {
      try {
        await this.deleteEngineer.execute(req.params.phoneNumber);
        res.status(200).json({ message: "Engineer has been deleted." });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = EngineerController;
  