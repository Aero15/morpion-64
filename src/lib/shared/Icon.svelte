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
  font-family: 'M64';
  src:  url('/fonts/M64/M64.eot?kdvwt3');
  src:  url('/fonts/M64/M64.eot?kdvwt3#iefix') format('embedded-opentype'),
    url('/fonts/M64/M64.ttf?kdvwt3') format('truetype'),
    url('/fonts/M64/M64.woff?kdvwt3') format('woff'),
    url('/fonts/M64/M64.svg?kdvwt3#M64') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'M64' !important;
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

.icon-paperclip_diagonal:before {
  content: "\e900";
}
.icon-cursor_text:before {
  content: "\e901";
}
.icon-hash:before {
  content: "\e902";
}
.icon-hash_straight:before {
  content: "\e903";
}
.icon-link_diagonal:before {
  content: "\e904";
}
.icon-link_diagonal_break:before {
  content: "\e905";
}
.icon-link_horizontal:before {
  content: "\e906";
}
.icon-link_horizontal_break:before {
  content: "\e907";
}
.icon-paperclip:before {
  content: "\e908";
}
.icon-calendar:before {
  content: "\e909";
}
.icon-star_half:before {
  content: "\e90a";
}
.icon-stop:before {
  content: "\e90b";
}
.icon-sun:before {
  content: "\e90c";
}
.icon-system_update:before {
  content: "\e90d";
}
.icon-table:before {
  content: "\e90e";
}
.icon-target:before {
  content: "\e90f";
}
.icon-television:before {
  content: "\e910";
}
.icon-tennis_ball:before {
  content: "\e911";
}
.icon-terminal:before {
  content: "\e912";
}
.icon-thumb_up:before,
.icon-thumb_down:before {
  content: "\e913";
}
.icon-thumb_down:before {
  transform: scaleY(-1);
}
.icon-trophy:before {
  content: "\e914";
}
.icon-undo:before {
  content: "\e915";
}
.icon-unlock:before {
  content: "\e916";
}
.icon-unpin:before {
  content: "\e917";
}
.icon-upload:before {
  content: "\e918";
}
.icon-user:before {
  content: "\e919";
}
.icon-vibrate:before {
  content: "\e91a";
}
.icon-vibrate_slash:before {
  content: "\e91b";
}
.icon-warning:before {
  content: "\e91c";
}
.icon-web:before {
  content: "\e91d";
}
.icon-write:before {
  content: "\e91e";
}
.icon-agenda:before {
  content: "\e91f";
}
.icon-align_center:before {
  content: "\e920";
}
.icon-align_justify:before {
  content: "\e921";
}
.icon-align_left:before {
  content: "\e922";
}
.icon-align_right:before {
  content: "\e923";
}
.icon-alphabet_asc:before {
  content: "\e924";
}
.icon-alphabet_desc:before {
  content: "\e925";
}
.icon-apps:before {
  content: "\e926";
}
.icon-arobase:before {
  content: "\e927";
}
.icon-arrow:before,
.icon-arrow_up:before,
.icon-arrow_left:before,
.icon-arrow_right:before,
.icon-arrow_down:before {
  content: "\e928";
}
.icon-arrow_up:before {transform: rotate(180deg);}
.icon-arrow_left:before {transform: rotate(90deg);}
.icon-arrow_right:before {transform: rotate(-90deg);}
.icon-arrow_diagonal:before {
  content: "\e929";
}
.icon-asterisk:before {
  content: "\e92a";
}
.icon-bell:before {
  content: "\e92b";
}
.icon-bell_slash:before {
  content: "\e92c";
}
.icon-bin:before {
  content: "\e92d";
}
.icon-blur:before {
  content: "\e92e";
}
.icon-bookmark:before {
  content: "\e92f";
}
.icon-bot:before {
  content: "\e930";
}
.icon-bot2:before {
  content: "\e931";
}
.icon-calc:before {
  content: "\e932";
}
.icon-chart_line:before {
  content: "\e933";
}
.icon-chat:before {
  content: "\e934";
}
.icon-chat_bubble:before {
  content: "\e935";
}
.icon-chat_bubble_slash:before {
  content: "\e936";
}
.icon-check:before {
  content: "\e937";
}
.icon-checkbox:before {
  content: "\e938";
}
.icon-checkbox_indeterminate:before {
  content: "\e939";
}
.icon-circle:before {
  content: "\e93a";
}
.icon-circles:before {
  content: "\e93b";
}
.icon-clear_input:before {
  content: "\e93c";
}
.icon-clock:before {
  content: "\e93d";
}
.icon-cloud:before {
  content: "\e93e";
}
.icon-compass:before {
  content: "\e93f";
}
.icon-config:before {
  content: "\e940";
}
.icon-contrast:before {
  content: "\e941";
}
.icon-corners_in:before {
  content: "\e942";
}
.icon-corners_out:before {
  content: "\e943";
}
.icon-critical:before {
  content: "\e944";
}
.icon-cross:before {
  content: "\e945";
}
.icon-cursor_select:before {
  content: "\e946";
}
.icon-database:before {
  content: "\e947";
}
.icon-details:before {
  content: "\e948";
}
.icon-diamond:before {
  content: "\e949";
}
.icon-dice:before {
  content: "\e94a";
}
.icon-disable:before {
  content: "\e94b";
}
.icon-download:before {
  content: "\e94c";
}
.icon-dropdown:before,
.icon-chevron_down:before,
.icon-chevron_up:before {
  content: "\e94d";
}
.icon-chevron_up:before {transform: rotate(180deg);}
.icon-duplicate:before {
  content: "\e94e";
}
.icon-edition:before {
  content: "\e94f";
}
.icon-emoji:before {
  content: "\e950";
}
.icon-expand_diagonal:before {
  content: "\e951";
}
.icon-experiment:before {
  content: "\e952";
}
.icon-extend:before {
  content: "\e953";
}
.icon-eye:before {
  content: "\e954";
}
.icon-file:before {
  content: "\e955";
}
.icon-filter:before {
  content: "\e956";
}
.icon-filters:before {
  content: "\e957";
}
.icon-flag:before {
  content: "\e958";
}
.icon-folder:before {
  content: "\e959";
}
.icon-folder_close:before {
  content: "\e95a";
}
.icon-folder_open:before {
  content: "\e95b";
}
.icon-glass:before {
  content: "\e95c";
}
.icon-gps:before {
  content: "\e95d";
}
.icon-gps_fix:before {
  content: "\e95e";
}
.icon-gps_slash:before {
  content: "\e95f";
}
.icon-grid:before {
  content: "\e960";
}
.icon-headset:before {
  content: "\e961";
}
.icon-heart:before {
  content: "\e962";
}
.icon-hide:before {
  content: "\e963";
}
.icon-history:before {
  content: "\e964";
}
.icon-home:before {
  content: "\e965";
}
.icon-house:before {
  content: "\e966";
}
.icon-i18n:before {
  content: "\e967";
}
.icon-image:before {
  content: "\e968";
}
.icon-image_slash:before {
  content: "\e969";
}
.icon-images:before {
  content: "\e96a";
}
.icon-inbox:before {
  content: "\e96b";
}
.icon-info:before {
  content: "\e96c";
}
.icon-inline_dots:before {
  content: "\e96d";
}
.icon-input:before {
  content: "\e96e";
}
.icon-joystick:before {
  content: "\e96f";
}
.icon-keyboard:before {
  content: "\e970";
}
.icon-keypad:before {
  content: "\e971";
}
.icon-labo:before {
  content: "\e972";
}
.icon-layers:before {
  content: "\e973";
}
.icon-layout:before {
  content: "\e974";
}
.icon-library:before {
  content: "\e975";
}
.icon-light:before {
  content: "\e976";
}
.icon-line:before {
  content: "\e977";
}
.icon-link:before {
  content: "\e978";
}
.icon-list:before {
  content: "\e979";
}
.icon-lock:before {
  content: "\e97a";
}
.icon-mail:before {
  content: "\e97b";
}
.icon-map:before {
  content: "\e97c";
}
.icon-menu:before {
  content: "\e97d";
}
.icon-menu_dots:before {
  content: "\e97e";
}
.icon-microphone:before {
  content: "\e97f";
}
.icon-microphone_muted:before {
  content: "\e980";
}
.icon-monitor:before {
  content: "\e981";
}
.icon-moon:before {
  content: "\e982";
}
.icon-mouse:before {
  content: "\e983";
}
.icon-mouse_left_click:before {
  content: "\e984";
}
.icon-mouse_left_click_duotone:before {
  content: "\e985";
}
.icon-music_note:before {
  content: "\e986";
}
.icon-music_note_slash:before {
  content: "\e987";
}
.icon-network:before {
  content: "\e988";
}
.icon-network_0:before {
  content: "\e989";
}
.icon-network_1:before {
  content: "\e98a";
}
.icon-network_2:before {
  content: "\e98b";
}
.icon-network_3:before {
  content: "\e98c";
}
.icon-numbers:before {
  content: "\e98d";
}
.icon-outbox:before {
  content: "\e98e";
}
.icon-output:before {
  content: "\e98f";
}
.icon-package:before {
  content: "\e990";
}
.icon-palette:before {
  content: "\e991";
}
.icon-palette_filled:before {
  content: "\e992";
}
.icon-pause:before {
  content: "\e993";
}
.icon-pencil:before {
  content: "\e994";
}
.icon-photo:before {
  content: "\e995";
}
.icon-photo_lens:before {
  content: "\e996";
}
.icon-pie_chart:before {
  content: "\e997";
}
.icon-pin:before {
  content: "\e998";
}
.icon-planet:before {
  content: "\e999";
}
.icon-play:before {
  content: "\e99a";
}
.icon-playlist:before {
  content: "\e99b";
}
.icon-plus:before {
  content: "\e99c";
}
.icon-podium:before {
  content: "\e99d";
}
.icon-position:before {
  content: "\e99e";
}
.icon-power:before {
  content: "\e99f";
}
.icon-printer:before {
  content: "\e9a0";
}
.icon-profile:before {
  content: "\e9a1";
}
.icon-program:before {
  content: "\e9a2";
}
.icon-radiobox:before {
  content: "\e9a3";
}
.icon-redo:before {
  content: "\e9a4";
}
.icon-reload:before {
  content: "\e9a5";
}
.icon-replay:before {
  content: "\e9a6";
}
.icon-rotate:before {
  content: "\e9a7";
}
.icon-save:before {
  content: "\e9a8";
}
.icon-schedule:before {
  content: "\e9a9";
}
.icon-screen:before {
  content: "\e9aa";
}
.icon-script:before {
  content: "\e9ab";
}
.icon-search:before {
  content: "\e9ac";
}
.icon-search_bar:before {
  content: "\e9ad";
}
.icon-search_group:before {
  content: "\e9ae";
}
.icon-send:before {
  content: "\e9af";
}
.icon-settings:before {
  content: "\e9b0";
}
.icon-shapes:before {
  content: "\e9b1";
}
.icon-shopping:before {
  content: "\e9b2";
}
.icon-shrink:before {
  content: "\e9b3";
}
.icon-slideshow:before {
  content: "\e9b4";
}
.icon-smartphone:before {
  content: "\e9b5";
}
.icon-sort:before {
  content: "\e9b6";
}
.icon-split:before {
  content: "\e9b7";
}
.icon-square:before {
  content: "\e9b8";
}
.icon-squares:before {
  content: "\e9b9";
}
.icon-star:before {
  content: "\e9ba";
}
.icon-star_filled:before {
  content: "\e9bb";
}
</style>