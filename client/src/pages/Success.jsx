import { useLocation } from "react-router-dom"

const Success = () => {
    const location = useLocation()

    console.log(location)
  return (
    <div>
        successfull
    </div>
  )
}

export default Success