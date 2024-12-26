<script lang="ts">
    interface Props {
        icon: string,
        size?: number
    }

    let {
        icon = $bindable(''),
        size = $bindable(16),
    }: Props = $props();
</script>

<span
    class="icon icon-{icon}"
    style:font-size={`${size}px`}
></span>

<style>
@font-face {
  font-family: 'MorpionRemixIcon';
  src:  url('/fonts/Neris/MorpionRemixIcon.eot?vqf1ye');
  src:  url('/fonts/Neris/MorpionRemixIcon.eot?vqf1ye#iefix') format('embedded-opentype'),
    url('/fonts/Neris/MorpionRemixIcon.ttf?vqf1ye') format('truetype'),
    url('/fonts/Neris/MorpionRemixIcon.woff?vqf1ye') format('woff'),
    url('/fonts/Neris/MorpionRemixIcon.svg?vqf1ye#MorpionRemixIcon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'MorpionRemixIcon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^="icon-"]:before,
[class*=" icon-"]:before 
{display: inline-block;}

.icon-numbers:before {
  content: "\e900";
}
.icon-package:before {
  content: "\e901";
}
.icon-palette:before {
  content: "\e902";
}
.icon-palette_filled:before {
  content: "\e903";
}
.icon-pause:before {
  content: "\e904";
}
.icon-pencil:before {
  content: "\e905";
}
.icon-pentagon:before {
  content: "\e906";
}
.icon-percent:before {
  content: "\e907";
}
.icon-pin:before {
  content: "\e908";
}
.icon-play:before {
  content: "\e909";
}
.icon-plus:before {
  content: "\e90a";
}
.icon-podium:before {
  content: "\e90b";
}
.icon-power:before {
  content: "\e90c";
}
.icon-profile:before {
  content: "\e90d";
}
.icon-program:before {
  content: "\e90e";
}
.icon-redo:before {
  content: "\e90f";
}
.icon-reload:before {
  content: "\e910";
}
.icon-rotate:before {
  content: "\e911";
}
.icon-save:before {
  content: "\e912";
}
.icon-schedule:before {
  content: "\e913";
}
.icon-search:before {
  content: "\e914";
}
.icon-send:before {
  content: "\e915";
}
.icon-settings:before {
  content: "\e916";
}
.icon-sort:before {
  content: "\e917";
}
.icon-square:before {
  content: "\e918";
}
.icon-squares:before {
  content: "\e919";
}
.icon-star:before {
  content: "\e91a";
}
.icon-target:before {
  content: "\e91b";
}
.icon-tennis_ball:before {
  content: "\e91c";
}
.icon-thumb_up:before,
.icon-thumb_down:before {
  content: "\e91d";
}
.icon-thumb_down:before {
  transform: scaleY(-1);
}
.icon-triangle:before {
  content: "\e91e";
}
.icon-undo:before {
  content: "\e91f";
}
.icon-unlock:before {
  content: "\e920";
}
.icon-unpin:before {
  content: "\e921";
}
.icon-user:before {
  content: "\e922";
}
.icon-warning:before {
  content: "\e923";
}
.icon-web:before {
  content: "\e924";
}
.icon-write:before {
  content: "\e925";
}
.icon-apps:before {
  content: "\e926";
}
.icon-arrow:before,
.icon-arrow_up:before,
.icon-arrow_left:before,
.icon-arrow_right:before,
.icon-arrow_down:before {
  content: "\e927";
}
.icon-arrow_up:before {transform: rotate(180deg);}
.icon-arrow_left:before {transform: rotate(90deg);}
.icon-arrow_right:before {transform: rotate(-90deg);}
.icon-asterisk:before {
  content: "\e928";
}
.icon-bell:before {
  content: "\e929";
}
.icon-bin:before {
  content: "\e92a";
}
.icon-bot:before {
  content: "\e92b";
}
.icon-calc:before {
  content: "\e92c";
}
.icon-chat:before {
  content: "\e92d";
}
.icon-chat_bubble:before {
  content: "\e92e";
}
.icon-chat_bubble_slash:before {
  content: "\e92f";
}
.icon-check:before {
  content: "\e930";
}
.icon-checkbox:before {
  content: "\e931";
}
.icon-checkbox_indeterminate:before {
  content: "\e932";
}
.icon-circle:before {
  content: "\e933";
}
.icon-circles:before {
  content: "\e934";
}
.icon-clear_input:before {
  content: "\e935";
}
.icon-clock:before {
  content: "\e936";
}
.icon-compass:before {
  content: "\e937";
}
.icon-config:before {
  content: "\e938";
}
.icon-cross:before {
  content: "\e939";
}
.icon-dice:before {
  content: "\e93a";
}
.icon-disable:before {
  content: "\e93b";
}
.icon-dropdown:before,
.icon-chevron_down:before,
.icon-chevron_up:before {
  content: "\e93c";
}
.icon-chevron_up:before {transform: rotate(180deg);}
.icon-duplicate:before {
  content: "\e93d";
}
.icon-edition:before {
  content: "\e93e";
}
.icon-emoji:before {
  content: "\e93f";
}
.icon-equal:before {
  content: "\e940";
}
.icon-expand_diagonal:before {
  content: "\e941";
}
.icon-experiment:before {
  content: "\e942";
}
.icon-extend:before {
  content: "\e943";
}
.icon-filter:before {
  content: "\e944";
}
.icon-filters:before {
  content: "\e945";
}
.icon-flag:before {
  content: "\e946";
}
.icon-glass:before {
  content: "\e947";
}
.icon-gps:before {
  content: "\e948";
}
.icon-gps_fix:before {
  content: "\e949";
}
.icon-gps_slash:before {
  content: "\e94a";
}
.icon-headset:before {
  content: "\e94b";
}
.icon-heart:before {
  content: "\e94c";
}
.icon-hexagon:before {
  content: "\e94d";
}
.icon-history:before {
  content: "\e94e";
}
.icon-home:before {
  content: "\e94f";
}
.icon-house:before {
  content: "\e950";
}
.icon-i18n:before {
  content: "\e951";
}
.icon-image:before {
  content: "\e952";
}
.icon-image_slash:before {
  content: "\e953";
}
.icon-info:before {
  content: "\e954";
}
.icon-inline_dots:before {
  content: "\e955";
}
.icon-joystick:before {
  content: "\e956";
}
.icon-keyboard:before {
  content: "\e957";
}
.icon-keypad:before {
  content: "\e958";
}
.icon-lock:before {
  content: "\e959";
}
.icon-losange:before {
  content: "\e95a";
}
.icon-map:before {
  content: "\e95b";
}
.icon-menu_dots:before {
  content: "\e95c";
}
.icon-minus:before {
  content: "\e95d";
}
.icon-monitor:before {
  content: "\e95e";
}
.icon-moon:before {
  content: "\e95f";
}
.icon-mouse:before {
  content: "\e960";
}
.icon-mouse_left_click:before {
  content: "\e961";
}
.icon-mouse_left_click_duotone:before {
  content: "\e962";
}
.icon-music_note:before {
  content: "\e963";
}
.icon-music_note_slash:before {
  content: "\e964";
}
</style>