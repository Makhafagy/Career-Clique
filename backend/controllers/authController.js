// User check authentication
// Inside your check authentication controller
exports.checkAuthentication = async (req, res) => {
  try {
    const isLoggedIn = true

    res.status(200).json({ isLoggedIn })
  } catch (error) {
    console.log('ERROR ', isLoggedIn)

    console.error('Error checking authentication:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}
