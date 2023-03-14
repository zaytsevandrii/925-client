import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader2 = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="400" height="15" />
  </ContentLoader>
)

export default MyLoader2