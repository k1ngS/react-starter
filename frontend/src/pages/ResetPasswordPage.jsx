import { useState } from "react"
import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../components/Input"
import { Lock } from "lucide-react"
import toast from "react-hot-toast"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { resetPassword, error, isLoading, message } = useAuthStore()

  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await resetPassword(token, password)

      toast.success("Password reset successfully, redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      console.error("Error resetting password: ", error.message)
      toast.error(error.message || "Error resetting password")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl"
    >
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Reset Password
        </h2>

        {message && <p className="text-center text-green-500">{message}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <Input 
            icon={Lock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />

          <Input 
            icon={Lock}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage