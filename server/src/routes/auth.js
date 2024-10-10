const express = require('express');
const { supabase } = require('../config/supabase.js');

const router = express.Router()

// Sign Up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const { user, error } = await supabase.auth.signUp({ email, password })
  
  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user })
})

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const { user, error } = await supabase.auth.signInWithPassword({ email, password })
  
  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user })
})

// Sign Out
router.post('/signout', async (req, res) => {
  const { error } = await supabase.auth.signOut()
  
  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ message: 'Signed out successfully' })
})

// Password Reset
router.post('/reset-password', async (req, res) => {
  const { email } = req.body
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
  
  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ message: 'Password reset email sent' })
})

module.exports = router;
