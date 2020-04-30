/**
 * @swagger
 *
 * /:resource/:
 *   get:
 *     tags:
 *       - resource
 *     summary: 取得所有指定 resource 
 *     responses:
 *       200:
 *         description: records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RecordModel'
 */
