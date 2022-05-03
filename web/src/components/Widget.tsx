import { ChatTeardropDots } from 'phosphor-react' //biblioteca de icones
import { Popover } from '@headlessui/react'// biblioteca de acessibilidade do tailwind
import { WidgetForm } from './WidgetForm'

export function Widget() {
  return (
    <Popover className="absolute bottom-4 md:bottom-8 right-5 md:right-8 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="flex items-center bg-brand-500 rounded-full px-3 h-12 text-white group">
        <ChatTeardropDots className="w-6 h-6"/>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500">
          <span className="pl-2">Feedback</span>
        </span>
      </Popover.Button>
    </Popover>
  )
}