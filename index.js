const Rsync     = require('rsync');
const Prompt    = require('prompt-sync')();

rsync = new Rsync();

const source            = Prompt('Source: ').trim().replace(/\\/g,'');
const destination       = Prompt('Destination: ').trim().replace(/\\/g,'');

rsync.progress()
    .flags( 'aPv' )
    .set( 'dry-run')
    .set('delete')
    .exclude(['.*','Icon','*.PRV/'])
    .source( source )
    .destination( destination );

rsync.execute(
    function(error, code, cmd) {
        rsync.unset('dry-run');
        console.log( rsync.command() );

        if ( Prompt('Haluatko varmasti kopioida kohteen "' + source +'" kohteeseen "' + destination + '/' + source + '"? (y/n) ') == 'y' ) {
            if ( Prompt('Poistetaanko listatut kohteet? (y/n) ') !== 'y' ) {
                rsync.unset('delete');
            }

            rsync.execute(
                function(error, code, cmd) {
                    // we're done
                }, function(data){
                    console.log( data.toString('utf-8') );
                }, function(data) {
                    console.log( data.toString('utf-8') );
                }
            );
        } else {
            console.log('Rsync peruttiin käyttäjän toimesta!');
        }
    }, function(data){
        console.log( data.toString('utf-8') );
    }, function(data) {
        console.log( data.toString('utf-8') );
        exit;
    }
);
