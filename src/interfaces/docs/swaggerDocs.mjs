import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


const router = express.Router();
const swaggerDocument = YAML.load('./src/interfaces/docs/swagger.yaml');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
