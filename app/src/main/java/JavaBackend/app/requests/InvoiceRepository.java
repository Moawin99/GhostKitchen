package JavaBackend.app.requests;

import JavaBackend.app.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> getAllByUserId(Long id);
}
