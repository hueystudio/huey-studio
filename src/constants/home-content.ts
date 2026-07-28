import type { IconType } from 'react-icons'
import { SiCsdn, SiGithub, SiSinaweibo } from 'react-icons/si'

export type SocialLink = {
  label: string
  href: string
  icon: IconType
}

/** 替换为你的真实主页地址 */
export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/huenet-x',
    icon: SiGithub,
  },
  {
    label: 'CSDN',
    href: 'https://blog.csdn.net/qq_39518871?type=blog',
    icon: SiCsdn,
  },
  {
    label: '微博',
    href: 'https://weibo.com/',
    icon: SiSinaweibo,
  },
]

export const heroStats = [
  { label: '年前端工程经验', value: '8+' },
  { label: '制造业 | 互联网', value: '500强' },
  { label: '当前技术方向', value: '全栈 + AI' },
]

export const aboutSections = [
  {
    index: '01',
    title: '教育背景',
    content:
      '我毕业于华南理工大学。在校期间，我的研究方向主要有无线网络的能量充电和无线传感网络的资源调度分配。',
  },
  {
    index: '02',
    title: '职业经历',
    content:
      '毕业后，我在世界500强的制造业和互联网企业工作，主要聚焦企业级前端技术落地与业务价值交付，核心围绕「纵向业务平台建设」与「横向跨团队技术复用」两大方向深耕，积累了从技术方案设计到规模化落地的全流程经验。',
  },
  {
    index: '03',
    title: '未来方向',
    content:
      '未来我将演进全栈和AI方向的能力，专注于为企业及客户创造极速、稳定且具备商业价值的数字产品。',
  },
]
