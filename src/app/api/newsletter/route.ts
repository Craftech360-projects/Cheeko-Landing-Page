import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get IP address and user agent from request
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    console.log('Attempting to subscribe email:', email)

    // Check if email already exists
    const { data: existingSubscriber, error: searchError } = await supabase
      .from('newsletter_subscriptions')
      .select('email, subscribed_at')
      .eq('email', email)
      .single()

    if (searchError && searchError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is expected for new subscribers
      console.error('Error checking existing subscriber:', searchError)
      return NextResponse.json(
        { error: 'Failed to process subscription. Please try again.' },
        { status: 500 }
      )
    }

    if (existingSubscriber) {
      console.log('Email already subscribed:', email)
      return NextResponse.json({ 
        success: true,
        message: 'Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.'
      })
    }

    // Insert new subscriber
    const { data, error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email,
          source: 'cheeko-landing-page',
          tags: ['newsletter'],
          ip_address,
          user_agent
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting subscriber:', insertError)
      
      // Check if it's a unique constraint error (email already exists)
      if (insertError.code === '23505') {
        return NextResponse.json({ 
          success: true,
          message: 'Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.'
        })
      }
      
      return NextResponse.json(
        { error: 'Failed to save subscription. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Successfully subscribed:', data)

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}