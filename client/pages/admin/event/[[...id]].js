import { useContext } from "react"
import { DataContext } from "../../../store/GlobalState"

const Event = () => {
  const {state} = useContext(DataContext)
  const {auth} = state

  if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}
return (
  <h1>Admin event</h1>
)
}

export default Event 