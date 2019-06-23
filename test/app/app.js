import app from '../../app/app'
import request from 'supertest'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('It should response localhost IP in JSON', async () => {
    return await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.ip).toBe('::ffff:127.0.0.1')
      })
  })

  test('It should response localhost IP in plain text', async () => {
    return await request(app)
      .get('/?text')
      .expect('Content-Type', /text/)
      .then(response => {
        expect(response.text).toBe('::ffff:127.0.0.1')
      })
  })
})
