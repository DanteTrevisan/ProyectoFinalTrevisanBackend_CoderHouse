import { mockingService } from "../services/services.js";
import { failureStatus } from "../utils/statuses.js";

class MockingController {
  constructor() {}

  async mockingProducts(req, res) {
    try {
      const fakeProducts = await mockingService.mockingProducts(100);
      res.status(200).json(fakeProducts);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new MockingController();