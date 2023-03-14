import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={271}
    height={360}
    viewBox="0 0 261 328"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="261" height="261" /> 
    <rect x="3" y="282" rx="5" ry="5" width="254" height="13" /> 
    <rect x="6" y="314" rx="6" ry="6" width="154" height="15" />
  </ContentLoader>
)

export default MyLoader