import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useHtmlDir = () => {
  const [htmlDir, setHtmlDir] = useState('')
  const { locale } = useRouter()

  useEffect(() => {
    if (
      locale !== undefined &&
      ['ar', 'arc', 'az', 'dv', 'ku', 'ckb', 'ur', 'he', 'fa'].includes(locale)
    ) {
      setHtmlDir('rtl')
    } else {
      setHtmlDir('ltr')
    }
  }, [locale])

  return htmlDir
}

export default useHtmlDir
