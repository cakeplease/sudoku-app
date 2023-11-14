import { mount } from '@vue/test-utils'
import Tab1Page from '@/views/Instructions.vue'
import { describe, expect, test } from 'vitest'

describe('Tab1Page.vue', () => {
  test('renders tab 1 Tab1Page', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('Instructions')
  })
})
