import { mount } from 'vue-test-utils'
import Login from '@/components/Login'

jest.mock('axios')

describe('Login.vue', () => {
  let wrp

  beforeEach(() => {
    wrp = mount(Login)
  })

  // it('should render correct contents', () => {
  //   expect(wrp.element).toMatchSnapshot()
  // })

  it('should fail on incorrect pass', (done) => {
    wrp.find('button').trigger('click')

    wrp.vm.$nextTick(() => {
      expect(wrp.vm.errorMessage).toEqual('login failed')
      done()
    })
  })
})
