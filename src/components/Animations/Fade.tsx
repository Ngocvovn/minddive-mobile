import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'

interface FadeProps {
  style?: StyleSheet
  children: React.ReactNode
}

interface FadeState {
  fadeAnim: Animated.Value
}

// Class for animating fade when component is mounted
export default class Fade extends Component<FadeProps, FadeState> {
  constructor(props: FadeProps) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  public componentDidMount(): void {
    Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      { toValue: 1 }, // Configuration
    ).start()
  }
  public render(): React.ReactNode {
    const { style, children, ...rest } = this.props

    return (
      <Animated.View // Special animatable View
        style={{ opacity: this.state.fadeAnim }}
      >
        {children}
      </Animated.View>
    )
  }
}
