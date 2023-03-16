import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonText = (props) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={40}
    viewBox="0 0 500 40"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="75" y="384" rx="0" ry="0" width="1" height="1" /> 
    <rect x="180" y="295" rx="0" ry="0" width="0" height="4" /> 
    <rect x="0" y="3" rx="9" ry="9" width="450" height="25" />
  </ContentLoader>
)

export default SkeletonText