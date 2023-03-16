import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader3 = (props) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 500 500"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="75" y="384" rx="0" ry="0" width="1" height="1" /> 
    <rect x="180" y="295" rx="10" ry="10" width="0" height="4" /> 
    <rect x="3" y="0" rx="30" ry="30" width="500" height="500" />
  </ContentLoader>
)

export default MyLoader3