/**
 * @swagger
 * /users:
 *   post:
 *     summary: 가입하기
 *     tags: [Users]
 *     requestBody:
 *          description:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              default: 철수
 *                              type: string
 *                              description: "name"
 *                          personal:
 *                              default: 111111-2222222
 *                              type: string
 *                              description: "주민번호"
 *                          email:
 *                              default: fhwm0241@gmail.com
 *                              type: string
 *                              description: "이메일"
 *                          prefer:
 *                              default: https://www.naver.com
 *                              type: string
 *                              description: "좋아하는 사이트"
 *                          pwd:
 *                              default: 1111
 *                              type: string
 *                              description: "비밀번호"
 *                          phone:
 *                              default: "01033402365"
 *                              type: string
 *                              description: "전화번호"
 *     responses:
 *        200:
 *          description: 성공
 *          content:
 *           application/json:
 *             schema:
 *               type: string
 *               default: 123a3124sd23h12kh3kh12jkh
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 정보 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 철수
 *                   email:
 *                     type: string
 *                     example: "a@a.com"
 *                   personal:
 *                     type: string
 *                     example: 111111-2222222
 *                   prefer:
 *                     type: string
 *                     example: https://www.naver.com
 *                   pwd:
 *                      type: string
 *                      example: 1234
 *                   phone:
 *                      type: string
 *                      example: "01033402365"
 *
 */
