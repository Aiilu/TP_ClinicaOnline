import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
  } from '@angular/animations';

  export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave ' , [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'translateY(-100%)',
        }),
      ], { optional: true }),
      // Animate the new page in
      query(':enter', [
        animate('600ms  ease', style({opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ]),
]); 