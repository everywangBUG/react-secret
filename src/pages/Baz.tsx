import { useEffect, useRef, useState } from "react"
import { useHover } from "../hooks/useHover"
import { useHoverRef } from "../hooks/useHoverRef"

export const Baz: React.FC = () => {
  const [ className, setClassName] = useState("aaa")

  // 2s后监听到 className 变化，重新渲染
  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000)
  }, [])

  const containerRef = useRef(null)

  useEffect(() => {
    const targetNode = containerRef.current!
  
    const callback = function (mutationsList: MutationRecord[]) {
      console.log(mutationsList)
    }
    
    const observer = new MutationObserver(callback)
    
    observer.observe(targetNode, { 
      // 观察所有监听的节点的属性值的变化
      attributes: true,
      // 监听节点中发生的节点的新增与删除z
      childList: true,
      // 监听整个子节点变化
      subtree: true
    })

  }, [])

  const element = (hover: boolean) => <div>{hover ? "hover" : "not hover"}</div>
  const [hoverable, hovered] = useHover(element)

  const ref = useRef(null)
  const isHovering = useHoverRef(ref)

  return (
    <div>
      <div id="container" ref={containerRef}>
        <div className={className}>
          {
            className === "aaa" ? <div>aaa</div> : <div>
              <p>bbb</p>
            </div>
          }
        </div>
      </div>
      <div>
        {hoverable}
        <div>{hovered ? "HOVERED" : ""}</div>
      </div>
      <div>
        <p>传ref的useHover hooks</p>
        <p ref={ref}>{isHovering ? "hover" : "leave Hover"}</p>
      </div>
    </div>
  )
}


