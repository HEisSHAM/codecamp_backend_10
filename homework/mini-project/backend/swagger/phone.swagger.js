/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 인증번호 발송
 *     tags: [Phone]
 *     requestBody:
 *          description: 인증번호 발송
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone:
 *                              default: "01033402365"
 *                              type: string
 *                              description: 전화번호
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 핸드폰으로 인증 문자가 전송되었습니다!
 *               items:
 *                 properties:
 *                   phone:
 *                     example: 01012345678"
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 인증하기
 *     tags: [Phone]
 *     requestBody:
 *          description: 인증번호 입력
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone:
 *                              default: "01033402365"
 *                              type: string
 *                              description: 전화번호
 *                          token:
 *                              default: 123456
 *                              type: string
 *                              description: 인증번호
 *     responses:
 *        200:
 *          description: 성공
 *          content:
 *           application/json:
 *             schema:
 *               type: string
 *               default: 휴대폰으로 인증번호 발송하였습니다.
 */
