import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";

import {
  faHome,
  faSave,
  faEdit,
  faEyeSlash,
  faEye,
  faSearch,
  faArrowAltCircleLeft,
  faListUl,
  faTh,
  faUser,
  faClock,
  faEnvelope,
  faMobileAlt,
  faUpload,
  faBell,
  faCar,
  faFileArchive,
  faFile,
  faPrint,
  faPlus,
  faPen,
  faTimes,
  faLocationArrow,
  faInfoCircle,
  faShoppingCart,
  faSignInAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faSave,
      faEdit,
      faEyeSlash,
      faEye,
      faSearch,
      faArrowAltCircleLeft,
      faListUl,
      faTh,
      faUser,
      faClock,
      faEnvelope,
      faMobileAlt,
      faUpload,
      faBell,
      faCar,
      faFileArchive,
      faFile,
      faPrint,
      faPlus,
      faPen,
      faTimes,
      faLocationArrow,
      faInfoCircle,
      faShoppingCart,
      faSignInAlt,
      faCheck
    );
  }
}
