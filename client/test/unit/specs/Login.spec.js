import { mount } from 'vue-test-utils'
import Login from '@/components/Login'

jest.mock('axios', () => {
  return {
    post: (url, data) => {
      if (data.password == '12345') {
        return Promise.resolve({ data: { id: 1234 }})
      }

      return Promise.reject({ response: {
        data: { error: { message: 'login failed'}}
      }})
    }
  }
})

describe('Login.vue', () => {
  let wrp

  beforeEach(() => {
    wrp = mount(Login)
  })

  it('should fail on incorrect pass', (done) => {
    wrp.find('form').trigger('submit')

    // why double $nextTick?
    wrp.vm.$nextTick(() => {
      wrp.vm.$nextTick(() => {
        expect(wrp.vm.errorMessage).toEqual('login failed')
        done()
      })
    })
  })

  it('should success on correct pass', (done) => {
    wrp.find('#password').element.value = '12345'
    wrp.find('#password').trigger('input')

    wrp.find('form').trigger('submit')

    // why double $nextTick?
    wrp.vm.$nextTick(() => {
      wrp.vm.$nextTick(() => {
        expect(wrp.vm.notifyMessage).toEqual('Loading...')
        done()
      })
    })
  })
})
