CREATE TABLE IF NOT EXISTS `tblCorrespondencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fechaentrada` DATETIME NOT NULL,
  `nombreorigen` VARCHAR(255) NOT NULL,
  `totaldocumentosanexos` INT NULL DEFAULT 0,
  `consecutivodocumentosanexos` VARCHAR(200) NULL,
  `fechadocumentoanexo` DATETIME NULL,
  `asuntomensaje` TEXT(1000) NULL,
  `procesodestino` VARCHAR(10) NOT NULL,
  `observaciones` TEXT(65000) NULL,
  `fechaanexoproceso` DATETIME NULL,
  `usuariolector` VARCHAR(30) NOT NULL,
  `usuarioactualizaexpediente` VARCHAR(30) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tblCorrespondencia_tblUsuarios_idx` (`usuariolector` ASC) VISIBLE,
  INDEX `fk_tblCorrespondencia_tblUsuarios1_idx` (`usuarioactualizaexpediente` ASC) VISIBLE,
  CONSTRAINT `fk_tblCorrespondencia_tblUsuarios`
    FOREIGN KEY (`usuariolector`)
    REFERENCES `tblUsuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblCorrespondencia_tblUsuarios1`
    FOREIGN KEY (`usuarioactualizaexpediente`)
    REFERENCES `tblUsuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

